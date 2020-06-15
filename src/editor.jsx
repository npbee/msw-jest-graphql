import * as React from "react";
import { useQuery, useMutation } from "urql";
import { useDebouncedCallback } from "use-debounce";

let query = `
  query Post($id: ID!) {
    post(id: $id) {
      id,
      title,
      likes
    }
  }
`;

let mutation = `
  mutation UpdatePost($id: ID!, $title: String!) {
    updatePost(id: $id, title: $title) {
      id,
      title
    }
  }
`;

export function Editor(props) {
  let { id } = props;
  let [res] = useQuery({
    query,
    variables: { id },
  });
  if (res.fetching) return "Loading...";
  if (res.error) return <p>Error!</p>;

  return (
    <div>
      <Form post={res.data.post} />
      <Likes likes={res.data.post.likes} />
    </div>
  );
}

function Form(props) {
  let { post } = props;
  let [updateRes, updatePost] = useMutation(mutation);

  let [save] = useDebouncedCallback(function save(post) {
    updatePost({ id: post.id, title: post.title });
  }, 500);

  let [state, setState] = React.useState(post);

  let onChange = name => evt => {
    setState({
      ...state,
      [name]: evt.target.value,
    });
  };

  let isMounted = React.useRef(false);
  React.useEffect(() => {
    if (isMounted.current) {
      save(state);
    }
  }, [state]);

  React.useEffect(() => {
    isMounted.current = true;
  }, []);

  return (
    <div>
      <div>
        <h1>Edit Post</h1>
        {updateRes.fetching && "Saving..."}
      </div>

      <form>
        <label htmlFor="title">Title</label>
        <input id="title" value={state.title} onChange={onChange("title")} />
      </form>
    </div>
  );
}

function Likes(props) {
  let { likes } = props;

  if (!likes) {
    throw new Error("No likes provided!");
  }

  return <span>This post has {likes} likes.</span>;
}
