import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation Signup(
    $username: String!
    $password: String!
    $role: String!
    $email: String
    $full_name: String
  ) {
    signup(
      username: $username
      password: $password
      role: $role
      email: $email
      full_name: $full_name
    ) {
      token
      user {
        id
        username
        full_name
        email
        role
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        full_name
        role
      }
    }
  }
`;




export const CREATE_DRUG = gql`
  mutation CreateDrug($input: CreateDrugInput!) {
    createDrug(input: $input) {
      id
      name
      price
      stock
      category
      description
      createdBy {
        id
        full_name
        role
      }
    }
  }
`;


export const BUY_DRUG = gql`
  mutation BuyDrug($input: BuyDrugInput!) {
    buyDrug(input: $input) {
      id
      quantity
      totalPrice
      drug {
        id
        name
        price
      }
    }
  }
`;

export const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment($input: CreateAppointmentInput!) {
    createAppointment(input: $input) {
      id
      status
      appointmentDate
    }
  }
`;


export const UPDATE_APPOINTMENT_STATUS = gql`
  mutation UpdateAppointmentStatus($input: UpdateAppointmentStatusInput!) {
    updateAppointmentStatus(input: $input) {
      id
      status
    }
  }
`;



export const CREATE_CONSULTATION = gql`
  mutation CreateConsultation(
    $patientId: ID!
    $symptoms: String!
    $diagnosis: String!
    $prescription: [PrescriptionInput]
    $followUpDate: String
  ) {
    createConsultation(
      patientId: $patientId
      symptoms: $symptoms
      diagnosis: $diagnosis
      prescription: $prescription
      followUpDate: $followUpDate
    ) {
      id
      symptoms
      diagnosis
      followUpDate
      patient {
        full_name
        email
        role
      }
      consultant {
        full_name
        role
      }
      createdAt
    }
  }
`;

export const APPROVE_AND_ASSIGN = gql`
  mutation ApproveAndAssign($input: ApproveAndAssignAppointmentInput!) {
    approveAndAssignAppointment(input: $input) {
      id
      status
      consultant {
        full_name
      }
    }
  }
`;





