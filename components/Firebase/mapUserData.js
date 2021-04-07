
export const mapUserData = async (user) => {
  const { uid, email } = user
  const token = await user.getIdToken()
  const profile = await fetch(`/api/getuser?fbuid=${uid}`)
    .then(res => res.json())
    .then(data => data)
  // console.log('profile', profile)
  return {
    id: uid,
    email,
    token,
    profile
  }
}
