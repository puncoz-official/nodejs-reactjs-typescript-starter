import HttpService from "../HttpService"

class ProfileService {
    static async getProfile() {
        const {body} = await HttpService.get("/profile/me")

        return body.data
    }
}

export default ProfileService
