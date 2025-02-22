import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';



test('renders without errors', ()=>{
    render(<ContactForm/>);
});




test('renders the contact form header', ()=> {
    render(<ContactForm/>);

    const formHeader = screen.queryByText(/contact form/i);

    expect(formHeader).toBeInTheDocument();
    expect(formHeader).toBeTruthy();
    expect(formHeader).toHaveTextContent(/contact form/i)
});




test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);

    const firstNameField = screen.getByLabelText(/first name*/i);
    // console.log(firstNameField)

    userEvent.type(firstNameField, '123');

    const errorMessages = await screen.findAllByTestId('error');

    expect(errorMessages).toHaveLength(1)
});




test('renders THREE error messages if user enters no values into any fields.', async () => {
   render(<ContactForm/>);

   const submitBtn = screen.getByText(/submit/i);
//    console.log(submitBtn);

    userEvent.click(submitBtn);

   const errorMessages3 = await screen.findAllByTestId('error');

   expect(errorMessages3).toHaveLength(3)
});




test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);

    const firstNameField = screen.getByLabelText(/first name*/i);
    const lastNameField = screen.getByLabelText(/last name */i);
    // console.log(firstNameField);
    // console.log(lastNameField);

    userEvent.type(firstNameField, 'James');
    userEvent.type(lastNameField, 'Jones');

    const submitBtn = screen.getByText(/submit/i);

    userEvent.click(submitBtn);

    const errorMessages2 = await screen.findAllByTestId('error');

    expect(errorMessages2).toHaveLength(1)
});




test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);

    const emailField = screen.getByLabelText(/email*/i);
    // console.log(emailField);
    userEvent.type(emailField, '234sdf');
    
    const errorMessage = await screen.findByText(/Error: email must be a valid email address./i);

    expect(errorMessage).toBeTruthy()
});




test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);

    const submitBtn= screen.getByText(/submit/i);

    userEvent.click(submitBtn);

    const errorMessage = await screen.findByText(/Error: lastName is a required field./i);

    expect(errorMessage).toBeTruthy();
});





test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);

    const firstNameField = screen.getByLabelText(/first name*/i);
    const lastNameField = screen.getByLabelText(/last name */i);
    const emailField = screen.getByLabelText(/email*/i);
    const submitBtn= screen.getByText(/submit/i);

    userEvent.type(firstNameField, 'gjdgsdf');
    userEvent.type(lastNameField, 'fgdjiasofsadijo');
    userEvent.type(emailField, 'adam.d.hinton@gmail.com');

    userEvent.click(submitBtn);

    await waitFor(()=>{
        const firstNameDisplay = screen.queryByText(/gjdgsdf/i);
        const lastNameDisplay = screen.queryByText(/fgdjiasofsadijo/i);
        const emailDisplay = screen.queryByText(/adam.d.hinton@gmail.com/i);

        expect(firstNameDisplay).toBeTruthy();
        expect(lastNameDisplay).toBeTruthy();
        expect(emailDisplay).toBeTruthy();
    });
});




test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);

    const firstNameField = screen.getByLabelText(/first name*/i);
    const lastNameField = screen.getByLabelText(/last name */i);
    const emailField = screen.getByLabelText(/email*/i);
    const messageField = screen.getByLabelText(/message/i);
    const submitBtn= screen.getByText(/submit/i);

    expect(firstNameField).toBeTruthy();
    expect(lastNameField).toBeTruthy();
    expect(emailField).toBeTruthy();
    expect(messageField).toBeTruthy();
    expect(submitBtn).toBeTruthy();

    userEvent.type(firstNameField, 'gjdgsdf');
    userEvent.type(lastNameField, 'fgdjiasofsadijo');
    userEvent.type(emailField, 'adam.d.hinton@gmail.com');

    userEvent.click(submitBtn);

    await waitFor(()=>{
        const firstNameDisplay = screen.queryByText(/gjdgsdf/i);
        const lastNameDisplay = screen.queryByText(/fgdjiasofsadijo/i);
        const emailDisplay = screen.queryByText(/adam.d.hinton@gmail.com/i);
        const messageDisplay = screen.queryByText(/hi/i);

        expect(firstNameDisplay).toBeInTheDocument();
        expect(lastNameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).toBeInTheDocument();
    });

});