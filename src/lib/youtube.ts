import axios from "axios";
import { YoutubeTranscript } from "youtube-transcript";
import { strict_output} from "./gpt";

export async function searchYoutube(searchQuery: string) {
  // hello world => hello+world
  searchQuery = encodeURIComponent(searchQuery);
  const { data } = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&q=${searchQuery}&videoDuration=medium&videoEmbeddable=true&type=video&maxResults=5`
  );
  if (!data) {
    console.log("youtube fail");
    return null;
  }
  if (data.items[0] == undefined) {
    console.log("youtube fail");
    return null;
  }
  return data.items[0].id.videoId;
}

export async function getTranscript(videoId: string) {
  try {
    let transcript_arr = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: "en",
      country: "EN",
    });
    let transcript = "";
    for (let t of transcript_arr) {
      transcript += t.text + " ";
    }
    return transcript.replaceAll("\n", "");
  } catch (error) {
    return "";
  }
}

export async function getQuestionsFromTranscript(
  transcript: string,
  course_title: string
) {
  type Question = {
    question: string;
    answer: string;
    option1: string;
    option2: string;
    option3: string;
  };
  const questions: Question[] = await strict_output(
    "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words. Produce questions. Don't mention it is fetched from a transcript. Make sure I dont see this error - Unexpected end of JSON input. Make sure you return the output as a JSON array always. Array should have atleast two questions. Make sure you don't use comma after the last key value pair.",
    new Array(5).fill(
      `You are to generate a random hard mcq question about ${course_title} with context of the following transcript: ${transcript} . Make sure you return the output as a JSON array always. Don't mention it is fetched from a transcript. You are generating quiz questions for a viewer watching the video. Make sure I dont see this error - Unexpected end of JSON input. Adhere to the format needed. Array should have atleast two questions. Make sure you don't use comma after the last key value pair. each object should have five properties provided. question, answer, option1, option2, option3`
    ),
    {
      question: "question",
      answer: "answer with max length of 15 words",
      option1: "option1 with max length of 15 words",
      option2: "option2 with max length of 15 words",
      option3: "option3 with max length of 15 words",
    }
  );
  return questions;
}
