import * as React from "react";
import { useQuery, useMutation, queryCache } from "react-query";
import { GraphQLClient } from "graphql-request";

let client = new GraphQLClient("/api/graphql");

let tweetsQuery = `
  query Tweets {
    tweets {
      id,
      body,
      likes
    }
  }
`;

let createTweetMutation = `
  mutation CreateTweet($body: String!) {
    createTweet(body: $body) {
      id,
      body
    }
  }
`;

export function List() {
  let { status, data } = useQuery("tweets", () => client.request(tweetsQuery));
  if (status === "loading") return "Loading...";
  if (status === "error") return <p>Error!</p>;

  let tweets = data.tweets;

  return (
    <div>
      <h2>Tweets</h2>
      {tweets.map(tweet => (
        <div key={tweet.id}>
          <h3>{tweet.body}</h3>
          <p>{tweet.likes}</p>
        </div>
      ))}
    </div>
  );
}

export function Form() {
  let [body, setBody] = React.useState("");
  let [error, setError] = React.useState(null);
  let [mutate] = useMutation(
    variables => client.request(createTweetMutation, variables),
    {
      onSuccess: () => queryCache.refetchQueries("tweets"),
      onError: () => {
        setError("Error!");
      },
    }
  );

  function submit(evt) {
    evt.preventDefault();

    mutate({ body }).then(res => {
      if (res && res.createTweet) {
        setBody("");
      }
    });
  }

  return (
    <div>
      <h2>Create a new Tweet</h2>
      <form onSubmit={submit}>
        <label htmlFor="body">Body</label>
        <textarea
          name="body"
          id="body"
          value={body}
          onChange={evt => setBody(evt.target.value)}
        />
        <button type="submit">Tweet</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
