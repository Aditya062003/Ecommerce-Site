import React from "react";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import {
  Grid,
  Stack,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  Button,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";

const Add = () => {
    const [form, setform] = useState({})
    const onChange = (e) =>{
        setform({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    const handleClick = async ()=>{
      const data = form
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let res = await a.json();
    }
  return (
    <ThemeProvider theme={theme}>
      <style jsx global>{`
        footer {
          display: none;
        }
      `}</style>
      <FullLayout>
        <p className="text-black text-center text-2xl font-bold ">
          Add a Product
        </p>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <BaseCard title="Form Layout">
              <Stack spacing={3}>
                <TextField
                value={form.title}
                  id="title"
                  name="title"
                  label="Title"
                  onChange={onChange}
                  variant="outlined"
                />
                <TextField
                value={form.slug}
                  id="slug"
                  onChange={onChange}
                  name="slug"
                  label="Slug"
                  variant="outlined"
                />

                <TextField
                value={form.desc}
                  id="outlined-multiline-static"
                  onChange={onChange}
                  label="Description"
                  name="desc"
                  multiline
                  rows={4}
                />
                <TextField
                  label="Category"
                  value={form.category}
                  name="category"
                  variant="outlined"
                  onChange={onChange}
                />
                <TextField
                  label="Image URL"
                  value={form.img}
                  name="img"
                  variant="outlined"
                  onChange={onChange}
                />
                <TextField label="Size" onChange={onChange} value={form.size} name="size" variant="outlined" />
                <TextField label="Color" onChange={onChange} value={form.color} name="color" variant="outlined" />
                <TextField label="Price" onChange={onChange} value={form.price} name="price" variant="outlined" />
                <TextField
                  label="AvaiableQty"
                  name="availableQty"
                  onChange={onChange}
                  variant="outlined"
                />
              </Stack>
              <br/>
              <Button variant="outlined" onClick={handleClick} mt={2}>
                Submit
              </Button>
            </BaseCard>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
};

export default Add;
