import { Router } from 'express'
import * as postCtrl from '../controllers/posts.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/', postCtrl.indexCategory)
router.get('/posts', postCtrl.indexPost)
router.get('/:id', postCtrl.showCategory)
router.get('/:id/posts/:postId', postCtrl.showPost)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, postCtrl.createCategory)
router.post('/:id/posts', checkAuth, postCtrl.createPost)
router.post('/:id/posts/:postId/comments', checkAuth, postCtrl.createComment)
router.put('/:id', checkAuth, postCtrl.updateCategory)
router.put('/:id/posts/:postId', checkAuth, postCtrl.updatePost)
router.put('/:id/posts/:postId/comments/:commentId', checkAuth, postCtrl.updateComment)
router.delete('/:id', checkAuth, postCtrl.deleteCategory)
router.delete('/:id/posts/:postId', checkAuth, postCtrl.deletePost)
router.delete('/:id/posts/:postId/comments/:commentId', checkAuth, postCtrl.deleteComment)

export { router }