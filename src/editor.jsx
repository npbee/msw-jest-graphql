import * as React from "react";
import { useQuery, useMutation } from "urql";
import { useDebouncedCallback } from "use-debounce";

let query = `
  query Post($id: ID!) {
    post(id: $id) {
      id,
      title,
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

export function Viewer(props) {
  let { id } = props;
  let [res] = useQuery({
    query,
    variables: { id },
  });
  if (res.fetching) return "Loading...";
  if (res.error) return <p>Error!</p>;
  let { post } = res.data;

  return (
    <div>
      <h2>Post</h2>
      <h3>{post.title}</h3>
    </div>
  );
}

export function Editor(props) {
  let { id } = props;
  let [res] = useQuery({
    query,
    variables: { id },
  });
  if (res.fetching) return "Loading...";
  if (res.error) return <p>Error!</p>;

  return <Form {...res.data} />;
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

  let currentState = React.useRef(state);

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
