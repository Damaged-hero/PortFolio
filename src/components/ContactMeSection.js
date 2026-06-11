import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const LandingSection = () => {
  // isLoading drives the button spinner, response triggers the alert, submit calls the API
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  const formik = useFormik({
    // initial empty values for all four fields
    initialValues: {
      firstName: "",
      email: "",
      type: "hireMe",
      comment: "",
    },
    // on valid submit, call the mock API with the form values
    onSubmit: (values) => {
      submit("/#contactme-section", values);
    },
    // Yup schema — each field is required, email must be a valid format
    validationSchema: Yup.object({
      firstName: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      type: Yup.string().required("Type of enquiry is required"),
      comment: Yup.string().required("Message is required"),
    }),
  });

  // watches for API response and shows the alert, resets form on success
  useEffect(() => {
    if (response) {
      onOpen(response.type, response.message);
      if (response.type === "success") {
        formik.resetForm();
      }
    }
  }, [response]);

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#11162c"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          {/* handleSubmit prevents default browser submit and runs Formik validation */}
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              {/* isInvalid only shows error after the field has been touched */}
              <FormControl isInvalid={formik.touched.firstName && !!formik.errors.firstName}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                {/* getFieldProps spreads value, onChange and onBlur — makes input controlled */}
                <Input id="firstName" name="firstName" {...formik.getFieldProps("firstName")} />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.touched.email && !!formik.errors.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input id="email" name="email" type="email" {...formik.getFieldProps("email")} />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select id="type" name="type" {...formik.getFieldProps("type")}>
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">Open source consultancy session</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              <FormControl isInvalid={formik.touched.comment && !!formik.errors.comment}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea id="comment" name="comment" height={250} {...formik.getFieldProps("comment")} />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>
              {/* isLoading shows a spinner on the button while the API call is in flight */}
              <Button type="submit" colorScheme="purple" width="full" isLoading={isLoading}>
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
