import { Category } from '../models/category.js'
import { Profile } from '../models/profile.js'
import { Post } from '../models/post.js'

const indexCategory = async (req, res) => {
  try {
    const categories = await Category.find({}).populate('posts').populate('owner')
    return res.status(200).json(categories)
    
  } catch(error) {
    return res.status(500).json(error)
  }
}

const indexPost = async (req, res) => {
  try {
    const posts = await Post.find({}).populate('category').populate('owner')
    return res.status(200).json(posts)
    
  } catch(error) {
    return res.status(500).json(error)
  }
}

const createCategory = async (req, res) => {
  try {
    req.body.owner = req.user.profile
    req.body.posts = req.user.profile
    req.body.admin = req.user.profile
    const newCategory = await new Category(req.body)
    await newCategory.save()
    await Profile.updateOne(
      { _id: req.user.profile },
      { $push: { categories: newCategory } }
    )
    return res.status(201).json(newCategory)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
      )
    return res.status(200).json(updatedCategory)
  } catch(error) {
    return res.status(500).json(error)
  }
}

const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.categoriess.remove({_id: req.params.id})
    await profile.save()
    return res.status(204).end()
  } catch(error) {
    return res.status(500).json(error)
  }
}

const createPost = async (req, res) => {
  try {
    req.body.owner = req.user.profile;
    req.body.category = req.params.id;
    const newPost = await new Post(req.body)
    await newPost.save()
    await Profile.updateOne(
      { _id: req.user.profile },
      { $push: { posts: newPost } }
    )
    await Category.updateOne(
      { _id: req.params.id },
      { $push: { posts: newPost } }
    )
    return res.status(201).json(newPost)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const showCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate('posts')
      .populate('owner')
    return res.status(200).json(category)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const showPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate('comments')
      .populate('name')
    return res.status(200).json(post)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      req.body,
      { new: true }
      )
    return res.status(200).json(updatedPost)
  } catch(error) {
    return res.status(500).json(error)
  }
}

const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.postId)
    const profile = await Profile.findById(req.user.profile)
    profile.posts.remove({_id: req.params.postId})
    const category = await Category.findById(req.params.id)
    category.posts.remove({_id: req.params.postId})
    await profile.save()
    await category.save()
    return res.status(204).end()
  } catch(error) {
    return res.status(500).json(error)
  }
}

const createComment = async (req, res) => {
  try {
    req.body.commentator = req.user.profile
    const profile = await Profile.findById(req.user.profile)
    const post = await Post.findById(req.params.postId)
    post.comments.push(req.body)
    await post.save()
    const newComment = post.comments[post.comments.length - 1]
    return res.status(201).json(newComment)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const updateComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    const updatedComment = await post.comments.find((comment) => (comment._id.equals(req.params.commentId)))
    updatedComment.comment_content = req.body.comment_content
    await post.save()
    return res.status(200).json(updatedComment)
  } catch(error) {
    return res.status(500).json(error)
  }
}

const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    post.comments.remove({ _id: req.params.commentId })
    await post.save()
    return res.status(204).end()
  } catch(error) {
    return res.status(500).json(error)
  }
}

export { indexCategory, indexPost, createCategory, updateCategory, deleteCategory, createPost, showCategory, showPost, updatePost, deletePost, createComment, updateComment, deleteComment }