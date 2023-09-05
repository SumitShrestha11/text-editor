import { convertToRaw, EditorState } from "draft-js";
import { draftToMarkdown } from "markdown-draft-js";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function Index() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [text, setText] = useState();
  const [markdownContent, setMarkdownContent] = useState();
  const onEditorStateChange = function (editorState) {
    setEditorState(editorState);
    const rawContentState = convertToRaw(editorState.getCurrentContent());

    let text = editorState.getCurrentContent().getPlainText("\u0001");

    // Custom Implementation
    text = text
      .split(" ")
      .map((splitText) => {
        if (/^@/.test(splitText)) {
          const key = Object.keys(rawContentState.entityMap).find((key) => {
            const entityData = rawContentState.entityMap?.[key]?.data;
            return entityData.text === splitText;
          });
          return key
            ? `@${rawContentState?.entityMap?.[key]?.data?.url}`
            : splitText;
        } else return splitText;
      })
      .join(" ");
    //

    setText(text);
    let markdownText = draftToMarkdown(rawContentState);
    setMarkdownContent(markdownText);
  };

  console.log(editorState.getCurrentContent(), text, "editor state");

  return (
    <>
      {<div style={{ height: "80px", overflow: "auto" }}>{text}</div>}
      {markdownContent ? (
        <>
          {" "}
          <div>In markdown</div>
          <div style={{ height: "80px", overflow: "auto" }}>
            {markdownContent}
          </div>
        </>
      ) : (
        ""
      )}
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        mention={{
          separator: " ",
          trigger: "@",
          suggestions: [
            { text: "APPLE", value: "apple", url: "appleid" },
            { text: "BANANA", value: "banana", url: "bananaid" },
            { text: "CHERRY", value: "cherry", url: "cherryid" },
            { text: "DURIAN", value: "durian", url: "durianid" },
            { text: "EGGFRUIT", value: "eggfruit", url: "eggfruitid" },
            { text: "FIG", value: "fig", url: "figid" },
            { text: "GRAPEFRUIT", value: "grapefruit", url: "grapefruitid" },
            { text: "HONEYDEW", value: "honeydew", url: "honeydewid" }
          ]
        }}
      />
    </>
  );
}
