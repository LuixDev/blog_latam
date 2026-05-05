const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function migrate() {
  const dir = path.join(process.cwd(), 'src/data/posts');
  if (!fs.existsSync(dir)) {
    console.log('No local posts found.');
    return;
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  console.log(`Found ${files.length} posts to migrate...`);

  for (const file of files) {
    const post = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
    
    // Mapear campos para que coincidan con la DB
    if (post.readTime) {
      post.read_time = post.readTime;
      delete post.readTime;
    }
    
    const { error } = await supabase.from('posts').upsert([post]);
    
    if (error) {
      console.error(`Error migrating ${file}:`, error.message);
    } else {
      console.log(`✅ Migrated: ${post.title}`);
    }
  }
}

migrate();
