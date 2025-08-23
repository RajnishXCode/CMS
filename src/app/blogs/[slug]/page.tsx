import React from 'react'

async function BlogPage({params}:{params: Promise<{slug:string}>}) {
  const {slug} = await params;
  return (
    <div>Blog Page: {slug}</div>
  )
}

export default BlogPage;