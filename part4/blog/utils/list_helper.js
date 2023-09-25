const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const likes = []
  blogs.forEach(item => {
    likes.push(item.likes)
  })
  const popular = Math.max(...likes)
  const filter = blogs.filter(item => item.likes === popular)
  const blog = filter.map(item => {
    return {
      title: item.title,
      author: item.author,
      likes: item.likes
    }
  })
  return blog
}

const mostBlogs = (blogs) => {
  const author = blogs.map(item => item.author)
  const model =
            _.chain(author)
              .countBy()
              .entries()
              .maxBy(_.last)
              .thru(_.head)
              .value()
  let count = 0

  author.forEach(item => {
    if (item === model) return count++
  })

  return {
    author: model,
    blogs: count
  }
}

const mostLikes = (blogs) => {
  const groupedBlogs = _.groupBy(blogs, 'author')
  const countedLikes = _.map(groupedBlogs, (arr) => {
    return {
      author: arr[0].author,
      likes: _.sumBy(arr, 'likes')
    }
  })
  const maxLikesAuthor = _.maxBy(countedLikes, (n) => n.likes)
  const authorName = _.head(_.values(maxLikesAuthor))

  return {
    author: authorName,
    likes: maxLikesAuthor.likes
  }
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
