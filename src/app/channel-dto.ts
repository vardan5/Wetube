export interface ChannelDto{
    channelName: string;
    userId: string;
    description: string;
    profilePicUrl: string;
    bannerPicUrl: string;
    email: string;
    featuredChannels: Array<string>;
    subscribers: Array<string>;
    uploadedVideos: Array<string>;
    myPlaylists: Array<string>;
}