import { AxiosInstance } from "axios";
import { 
    LoginResponse, 
    LoginResponseSchema, 
    GetLogsByUserResponseSchema, 
    GetLogsByUserResponse, 
    GetLogByIdResponse, 
    GetLogByIdResponseSchema, 
    GetPlantsResponse, 
    GetPlantsResponseSchema 
} from "../models/hanagotchiApi";
import { UpdateUserSchema, User, UserSchema } from "../models/User";
import { CreateLog, Log, LogSchema, PartialUpdateLog } from "../models/Log";
import { Post, PostData, PostSchema } from "../models/Post";

const generateDummyData = () => {
    const dummyData: Post[] = [];
  
    for (let i = 0; i < 50; i++) {
      const postData: Post = {
        id: String(i),
        author: {
            id: i,
            name: `Author ${i}`,
            nickname: `nickName${i}`,
            photo: null
        },
        content: `Post content ${i}`,
        likes_count: Math.floor(Math.random() * 100),
        created_at: new Date(),
        updated_at: new Date(),
        photo_links: Math.random() < 0.5 ? [
          "https://firebasestorage.googleapis.com/v0/b/hanagotchi.appspot.com/o/plants%2F5%2F1712438363124?alt=media&token=9cdd20c2-43f0-4327-9eb9-8135e6b5a306"
        ] : [],
      };
      dummyData.push(PostSchema.parse(postData));
    }
  
    return dummyData;
};

let dummyPosts = generateDummyData();
  

export interface HanagotchiApi {
    logIn: (authCode: string) => Promise<LoginResponse>;
    getUser: (userId: number) => Promise<User>;
    patchUser: (user: User) => Promise<void>;
    getLogsByUser: (userId: number, params: {year: number, month?: number}) => Promise<GetLogsByUserResponse>;
    getLogById: (logId: number) => Promise<GetLogByIdResponse>;
    getPlants: (params: {id_user?: number, limit?: number}) => Promise<GetPlantsResponse>;
    createLog: (log: CreateLog) => Promise<Log>;
    editLog: (logId: number, updateSet: PartialUpdateLog) => Promise<Log>;
    addPhotoToLog: (logId: number, body: {photo_link: string}) => Promise<Log>;
    deletePhotoFromLog: (logId: number, photoId: number) => Promise<void>;
    createPost: (post: PostData) => Promise<Post>;
    deletePost: (postId: string) => Promise<void>;
    dummyGetPosts: (page: number, size: number) => Promise<Post[]>;
}

export class HanagotchiApiImpl implements HanagotchiApi {

    private axiosInstance: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance;
    }

    async logIn(authCode: string): Promise<LoginResponse> {
        const { data } = await this.axiosInstance.post("/login", { auth_code: authCode });
        data.message.birthdate = new Date(data.message.birthdate);
        return LoginResponseSchema.parse(data);
    }

    async getUser(userId: number): Promise<User> {
        const { data } = await this.axiosInstance.get(`/users/${userId}`);
        return UserSchema.parse(data?.message);
    }

    async patchUser(user: User): Promise<void> {
        const updateUser = UpdateUserSchema.parse(user);
        await this.axiosInstance.patch(`/users/${user.id}`, updateUser);
    }

    async getLogsByUser(userId: number, params: {year: number, month?: number} ): Promise<GetLogsByUserResponse> {
        const { data } = await this.axiosInstance.get(`/logs/user/${userId}`, {params});
        return GetLogsByUserResponseSchema.parse(data);
    }

    async getLogById(logId: number): Promise<GetLogByIdResponse> {
        const { data } = await this.axiosInstance.get(`/logs/${logId}`);
        return GetLogByIdResponseSchema.parse(data);
    }

    async getPlants(params: {id_user?: number, limit?: number}): Promise<GetPlantsResponse> {
        const { data } = await this.axiosInstance.get(`/plants`, {params});
        return GetPlantsResponseSchema.parse(data)
    }

    async createLog(body: CreateLog): Promise<Log> {
        const { data } = await this.axiosInstance.post("/logs", body);
        return LogSchema.parse(data);
    }
    
    async editLog(logId: number, updateSet: PartialUpdateLog): Promise<Log> {
        const { data } = await this.axiosInstance.patch(`/logs/${logId}`, updateSet);
        return LogSchema.parse(data);
    }

    async addPhotoToLog(logId: number, body: {photo_link: string}): Promise<Log> {
        const { data } = await this.axiosInstance.post(`/logs/${logId}/photos`, body);
        return LogSchema.parse(data);
    }

    async deletePhotoFromLog(logId: number, photoId: number) {
        await this.axiosInstance.delete(`/logs/${logId}/photos/${photoId}`);
    }

    async createPost(body: PostData) {
        // TODO: add social urls support in gateway
        // THIS IS A MOCKED RESPONSE!!!!!!!!!!!!!!!!!!!!!!
        // const { data } = await this.axiosInstance.post("/post", body);
        const myUser: User = await this.getUser(body.author_user_id);
        const data: Post = {
            id: (new Date()).toString(),
            author: {
                id: myUser.id,
                name: myUser.name,
                photo: myUser.photo,
                nickname: myUser.nickname,
            },
            content: body.content,
            likes_count: 0,
            updated_at: new Date(),
            created_at: new Date(),
            photo_links: body.photo_links,
        }
        dummyPosts.unshift(data);
        return PostSchema.parse(data);
    }

    async deletePost(postId: string) {
        dummyPosts = dummyPosts.filter(p => p.id !== postId);
    }

    async dummyGetPosts(page: number, size: number) {
        return dummyPosts.slice(size*(page-1), size*page)
    }
    
}