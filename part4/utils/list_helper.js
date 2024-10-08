const dummy = (blogs) =>{
    return 1
}

const totalLikes = (blogs) =>{
    const total = blogs.reduce((sum, blog) =>{
        return sum + blog.likes
    }, 0)
    return total
}

const mostLikes = (blogs) =>{
    if (blogs.length ===0) return -1
    const total = blogs.reduce((max, blog)=>{
        if (blog.likes > max.likes) max = blog
        return max
    }, {likes: -1})

    const result = {
      title: `${total.title}`,
      author: `${total.author}`,
      likes: total.likes
    };
    return result
}

module.exports = {dummy, totalLikes, mostLikes}