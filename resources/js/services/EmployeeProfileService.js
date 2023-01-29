import Api from "./Api";

export default {
    get() {
        return Api.get('/api/employees/me/profile')
            .then(response => {
                return {
                    profile: response.data
                }
            })
    },
    update(profile) {
        return Api.put('/api/employees/me/profile', profile)
    },
    updateProfilePicture(profilePicture) {
        let formData = new FormData()
        formData.append('profile_picture', profilePicture)
        return Api.post('/api/employees/me/profile-picture', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    deleteProfilePicture() {
        return Api.delete('/api/employees/me/profile-picture')
    }
}
