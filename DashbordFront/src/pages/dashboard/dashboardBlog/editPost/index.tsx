import React, {  useState, useRef } from "react";
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

const EditePost: React.FC = () => {
  const { UpdatePost } = useActions();
  const { user } = useTypedSelector((state) => state.UserReducer);
  const { readPost } = useTypedSelector((state) => state.BlogReducer);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [content, setContent] = useState<string>("");
  const [imageData, setImageData] = useState<string>("");
  const [_imageUrl, setImageUrl] = useState<string>(
    "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
  );
  const initialValues = {
    title: `${readPost.title}`,
    imageName: `${readPost.imageName}`,
    imageUrl: `${readPost.imageUrl}`,
    shortDescription: `${readPost.shortDescription}`,
    fullDescription: `${readPost.fullDescription}`,
  };
const {title , imageUrl} = readPost;

  console.log(title , imageUrl);
  

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
            Edite post
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
                  value={_imageUrl}
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
                    setImageUrl(event.target.value);
                  }}
                />
                {errors.imageName && touched.imageName ? (
                  <div style={{ color: "red" }}>{errors.imageName}</div>
                ) : null}

                <Cropper
                  src={_imageUrl}
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
                <Paper sx={{ height: "300px" }}>
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
                <Typography sx={{ textAlign: "center" }}>
                  <Button
                    disabled={!(isValid && dirty)}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, width: "200px" }}
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

export default EditePost;
