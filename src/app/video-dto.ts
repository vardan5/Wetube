export interface VideoDto{
    videoId: string;
    userId: string;
    videoName: string;
    description: string;
    dateUploaded: Date;
    tags: Array<string>;
    videoStatus: string;
    videoUrl: string;
    thumbnailUrl: string;
    likeCount: number;
    dislikeCount: number;
    viewCount: number;
}