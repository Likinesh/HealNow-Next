import VideoCall from "./_components/videoPage";

export default async function VideoCallPage({ searchParams }) {
  const { sessionId, token } = await searchParams;

  return <VideoCall sessionId={sessionId} token={token} />;
}