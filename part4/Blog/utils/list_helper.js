const dummy = (blogs) => {
    if (Array.isArray(blogs)) {
        return 1
    } else {
        return 0
    }
}
  
const totalLikes = (blogs) => {
    let sum = 0;
    for (const blog of blogs) {
        if (blog.hasOwnProperty("likes")) {
            sum += blog.likes
        }
    }
    return sum
}

const favoriteBlog = (blogs) => {
    if (blogs.lenght === 0) {
        return null
    }
    let favorite = blogs[0]

    for (const blog of blogs)
    {
        if (blog.likes > favorite.likes) {
            favorite = blog
        }
    }

    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}
  
  module.exports = {
      dummy,
      totalLikes,
      favoriteBlog
  }