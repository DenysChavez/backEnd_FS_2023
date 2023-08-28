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
  
  module.exports = {
      dummy,
      totalLikes
  }