import * as React from "react";
import { json, type LoaderFunction, type V2_MetaFunction } from "@remix-run/deno";
import { useLoaderData } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const parsed = await response.json();
    return json(parsed, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    // Return the error message as a string so that you can render it in your component
    return json({ error: error.message }, { status: error.response?.status || 500 });
  }
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <h1>{data.title}</h1>
      <ul>
        <li>
          <a target="_blank" href="https://remix.run/tutorials/blog" rel="noreferrer">
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/tutorials/jokes" rel="noreferrer">
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
