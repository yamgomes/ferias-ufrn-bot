import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import Twitter from "twitter";

export async function tweetWithMedia(text, image) {
  let client = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token,
    access_token_secret: process.env.access_token_secret,
  });
  client.post("media/upload", { media: image }, (error, media, response) => {
    if (!error) {
      // If successful, a media object will be returned.
      console.log(media);

      // Lets tweet it
      var status = {
        status: text,
        media_ids: media.media_id_string, // Pass the media id string
      };

      client.post("statuses/update", status, function (error, tweet, response) {
        if (!error) {
          console.log(tweet);
          console.log("\n================\n");
          console.log(response);
        } else {
          console.log(error);
        }
      });
    } else console.log(error);
  });
}

export async function tweetWithoutMedia(text) {
  let client = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token,
    access_token_secret: process.env.access_token_secret,
  });
  client.post(
    "statuses/update",
    { status: text },
    function (error, tweet, response) {
      if (!error) {
        console.log(tweet);
        console.log("\n================\n");
        console.log(response);
      } else {
        console.log(error);
      }
    }
  );
}

export async function tweetWithImageAndThought(message) {
  message += "\n\npensamento do dia: ";
  console.log("Pensando...\n");
  message += await obterPensamento(message.length);
  console.log(message);
  await tweetWithImage(message);
}
