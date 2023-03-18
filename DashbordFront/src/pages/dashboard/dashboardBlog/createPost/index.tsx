import React, { useEffect, useState, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Field } from "formik";

import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useActions } from "../../../../hooks/useActions";

const theme = createTheme();

const CreatePost: React.FC = () => {
  const { CreatePost } = useActions();
  const { user } = useTypedSelector((state) => state.UserReducer);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [content, setContent] = useState<string>("");
  const [imageData, setImageData] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>(
    "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
  );
  const initialValues = {
    title: `${""}`,
    imageName: `${""}`,
    shortDescription: `${""}`,
    fullDescription: `${""}`,
  };

  const myNormStr: EditorState = JSON.parse(
    `{"_immutable":{"allowUndo":true,"currentContent":{"entityMap":{},"blockMap":{"5ln0m":{"key":"5ln0m","type":"unstyled","text":"Hi gg my name is Tomas... ","characterList":[{"style":["color-rgba(0,0,0,0.87)","bgcolor-rgb(255,255,255)","fontsize-16","fontfamily-Roboto, Helvetica, Arial, sans-serif"],"entity":null},{"style":["color-rgba(0,0,0,0.87)","bgcolor-rgb(255,255,255)","fontsize-16","fontfamily-Roboto, Helvetica, Arial, sans-serif"],"entity":null},{"style":["color-rgba(0,0,0,0.87)","bgcolor-rgb(255,255,255)","fontsize-16","fontfamily-Roboto, Helvetica, Arial, sans-serif"],"entity":null},{"style":["color-rgba(0,0,0,0.87)","bgcolor-rgb(255,255,255)","fontsize-16","fontfamily-Roboto, Helvetica, Arial, sans-serif"],"entity":null},{"style":["color-rgba(0,0,0,0.87)","bgcolor-rgb(255,255,255)","fontsize-16","fontfamily-Roboto, Helvetica, Arial, sans-serif"],"entity":null},{"style":["color-rgba(0,0,0,0.87)","bgcolor-rgb(255,255,255)","fontsize-16","fontfamily-Roboto, Helvetica, Arial, sans-serif"],"entity":null},{"style":["color-rgba(0,0,0,0.87)","bgcolor-rgb(255,255,255)","fontsize-16","fontfamily-Roboto, Helvetica, Arial, sans-serif"],"entity":null},{"style":["color-rgba(0,0,0,0.87)","bgcolor-rgb(255,255,255)","fontsize-16","fontfamily-Roboto, Helvetica, Arial, sans-serif"],"entity":null},{"style":["color-rgba(0,0,0,0.87)","bgcolor-rgb(255,255,255)","fontsize-16","fontfamily-Roboto, Helvetica, Arial, sans-serif"],"entity":null},{"style":["color-rgb(226,80,65)","bgcolor-rgb(255,255,255)","fontsize-16","fontfamily-Roboto, Helvetica, Arial, sans-serif"],"entity":null},{"style":["color-rgb(226,80,65)","bgcolor-rgb(255,255,255)","fontsize-16","fontfamily-Roboto, Helvetica, Arial, sans-serif"],"entity":null},{"style":["color-rgb(226,80,65)","bgcolor-rgb(255,255,255)","fontsize-16","fontfamily-Roboto, Helvetica, Arial, sans-serif"],"entity":null},{"style":["color-rgb(226,80,65)","bgcolor-rgb(255,255,255)","fontsize-16","fontfamily-Roboto, Helvetica, Arial, sans-serif"],"entity":null},{"style":["color-rgb(226,80,65)","bgcolor-rgb(255,255,255)","fontsize-16","fontfamily-Roboto, Helvetica, Arial, sans-serif"],"entity":null},{"style":["color-rgb(226,80,65)","bgcolor-rgb(255,255,255)","fontsize-16","fontfamily-Roboto, Helvetica, Arial, sans-serif"],"entity":null},{"style":["color-rgb(226,80,65)","bgcolor-rgb(255,255,255)","fontsize-16","fontfamily-Roboto, Helvetica, Arial, sans-serif"],"entity":null},{"style":["color-rgba(0,0,0,0.87)","bgcolor-rgb(255,255,255)","fontsize-16","fontfamily-Roboto, Helvetica, Arial, sans-serif"],"entity":null},{"style":["color-rgba(0,0,0,0.87)","bgcolor-rgb(255,255,255)","fontsize-16","fontfamily-Roboto, Helvetica, Arial, sans-serif"],"entity":null},{"style":["color-rgba(0,0,0,0.87)","bgcolor-rgb(255,255,255)","fontsize-16","fontfamily-Roboto, Helvetica, Arial, sans-serif"],"entity":null},{"style":["color-rgba(0,0,0,0.87)","bgcolor-rgb(255,255,255)","fontsize-16","fontfamily-Roboto, Helvetica, Arial, sans-serif"],"entity":null},{"style":["color-rgba(0,0,0,0.87)","bgcolor-rgb(255,255,255)","fontsize-16","fontfamily-Roboto, Helvetica, Arial, sans-serif"],"entity":null},{"style":["color-rgba(0,0,0,0.87)","bgcolor-rgb(255,255,255)","fontsize-16","fontfamily-Roboto, Helvetica, Arial, sans-serif"],"entity":null},{"style":["color-rgba(0,0,0,0.87)","bgcolor-rgb(255,255,255)","fontsize-16","fontfamily-Roboto, Helvetica, Arial, sans-serif"],"entity":null},{"style":["color-rgba(0,0,0,0.87)","bgcolor-rgb(255,255,255)","fontsize-16","fontfamily-Roboto, Helvetica, Arial, sans-serif"],"entity":null},{"style":["color-rgba(0,0,0,0.87)","bgcolor-rgb(255,255,255)","fontsize-16","fontfamily-Roboto, Helvetica, Arial, sans-serif"],"entity":null},{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"5ln0m","anchorOffset":0,"focusKey":"5ln0m","focusOffset":0,"isBackward":false,"hasFocus":true},"selectionAfter":{"anchorKey":"5ln0m","anchorOffset":26,"focusKey":"5ln0m","focusOffset":26,"isBackward":false,"hasFocus":true}},"decorator":{"_decorators":[{}]},"directionMap":{"5ln0m":"LTR"},"forceSelection":false,"inCompositionMode":false,"inlineStyleOverride":null,"lastChangeType":"insert-characters","nativelyRenderedContent":null,"redoStack":[],"selection":{"anchorKey":"5ln0m","anchorOffset":26,"focusKey":"5ln0m","focusOffset":26,"isBackward":false,"hasFocus":false},"treeMap":{"5ln0m":[{"start":0,"end":26,"decoratorKey":null,"leaves":[{"start":0,"end":9},{"start":9,"end":16},{"start":16,"end":25},{"start":25,"end":26}]}]},"undoStack":[{"entityMap":{},"blockMap":{"5ln0m":{"key":"5ln0m","type":"unstyled","text":"","characterList":[],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"5ln0m","anchorOffset":0,"focusKey":"5ln0m","focusOffset":0,"isBackward":false,"hasFocus":false},"selectionAfter":{"anchorKey":"5ln0m","anchorOffset":0,"focusKey":"5ln0m","focusOffset":0,"isBackward":false,"hasFocus":false}}]}}`
  );
  useEffect(() => {}, []);

  const tmpLoadContent = `<p>dsfgsdfgd<span style="font-size: 18px;"> sdf</span>g dsfg 😃</p>`;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const post = new FormData(event.currentTarget);

    var str = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const newPost = {
      title: post.get("title"),
      ImageData: imageData,
      shortDescription: post.get("shortDescription"),
      fullDescription: str,
      userId: user.Id, // "2b824ed5-7c2f-43e5-be54-0091b7026f13"
    };

    // EditorState.push(editorState,_contentState, undefined);
    //const myJs = JSON.stringify(editorState);
    console.log(newPost);

    CreatePost(newPost);
  };

  const handleEditorChange = (data: EditorState) => {
    setEditorState(data);
  };

  //Image Cropper
  const cropperRef = useRef<HTMLImageElement>(null);
  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    setImageData(cropper.getCroppedCanvas().toDataURL());
    // console.log(cropper.getCroppedCanvas().toDataURL());
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Create post
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={() => {}}
            validationSchema={null}
          >
            {({ errors, touched, isSubmitting, isValid, dirty }) => (
              <Box
                onSubmit={handleSubmit}
                style={{ width: "100%" }}
                component="form"
                noValidate
                sx={{ mt: 1 }}
              >
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  autoComplete="title"
                />
                {errors.title && touched.title ? (
                  <div style={{ color: "red" }}>{errors.title}</div>
                ) : null}

                <Field
                  as={TextField}
                  margin="normal"
                  value={imageUrl}
                  type="input"
                  required
                  fullWidth
                  id="imageName"
                  label="Image Url"
                  name="imageName"
                  autoComplete="imageName"
                  onChange={(
                    event: React.ChangeEvent<
                      HTMLTextAreaElement | HTMLInputElement
                    >
                  ) => {
                    console.log(event.target.value);
                    setImageUrl(event.target.value);
                  }}
                />
                {errors.imageName && touched.imageName ? (
                  <div style={{ color: "red" }}>{errors.imageName}</div>
                ) : null}

                <Cropper
                  src={imageUrl}
                  style={{ height: 500, width: "100%" }}
                  // Cropper.js options
                  initialAspectRatio={16 / 9}
                  guides={false}
                  crop={onCrop}
                  ref={cropperRef}
                />

              
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  id="shortDescription"
                  label="Short description"
                  name="shortDescription"
                  autoComplete="shortDescription"
                />
                <Paper sx={{height:"300px"}}>
                  <Editor
                  
                    editorState={editorState}
                    wrapperClassName="card"
                    editorClassName="card-body"
                    onEditorStateChange={(newState) => {
                      setEditorState(newState);
                      setContent(
                        draftToHtml(convertToRaw(newState.getCurrentContent()))
                      );
                    }}
                    toolbar={{
                      options: [
                        "inline",
                        "blockType",
                        "fontSize",
                        "list",
                        "textAlign",
                        "history",
                        "embedded",
                        "emoji",
                        "image",
                      ],
                      inline: { inDropdown: true },
                      list: { inDropdown: true },
                      textAlign: { inDropdown: true },
                      link: { inDropdown: true },
                      history: { inDropdown: true },
                    }}
                    
                  />
                </Paper>

                {errors.shortDescription && touched.shortDescription ? (
                  <div style={{ color: "red" }}>{errors.shortDescription}</div>
                ) : null}
<Typography sx={{textAlign:"center"}}>
<Button
                  disabled={!(isValid && dirty)}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 , width:"200px"}}
                >
                  {isSubmitting ? "Loading" : "Save"}
                </Button>
</Typography>
                
              </Box>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CreatePost;
