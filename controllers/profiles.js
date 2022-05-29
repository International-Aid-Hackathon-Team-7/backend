import { Profile } from '../models/profile.js'

function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

const showProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id)
      .populate('posts')
      .populate('favorited_posts')
    return res.status(200).json(profile)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const updateProfile = async (req, res) => {
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.profileId,
      req.body,
      { new: true }
      )
    return res.status(200).json(updatedProfile)
  } catch(error) {
    return res.status(500).json(error)
  }
}

export { index, showProfile, updateProfile }
