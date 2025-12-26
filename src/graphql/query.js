import { gql } from "@apollo/client";

export const GET_DRUGS = gql`
  query GetDrugs {
    getDrugs {
      id
      name
      category
      description
      price
      stock
      createdBy {
        id
        full_name
      }
    }
  }
`;



/* Single consultation */
export const CONSULTATION_BY_ID = gql`
  query ConsultationById($id: ID!) {
    consultationById(id: $id) {
      id
      symptoms
      diagnosis
      followUpDate
      patient {
        full_name
        email
      }
    }
  }
`;

/* Consultant patients */
export const MY_PATIENTS = gql`
  query MyPatients {
    myPatients {
      id
      full_name
      email
    }
  }
`;





export const GET_APPOINTMENTS = gql`
  query GetAppointments {
    getAppointments {
      id
      reason
      appointmentDate
      status
      patient {
        full_name
      }
    }
  }
`;



export const MY_DRUG_PURCHASE_HISTORY = gql`
  query {
    myDrugPurchaseHistory {
      id
      quantity
      unitPrice
      totalPrice
      createdAt
      drug {
        name
        price
      }
    }
  }
`;

export const DRUG_PURCHASE_RECEIPT = gql`
  query DrugPurchaseReceipt($id: ID!) {
    drugPurchaseReceipt(id: $id) {
      id
      quantity
      unitPrice
      totalPrice
      createdAt
      drug {
        name
        price
      }
    }
  }
`;





export const MY_CONSULTATIONS = gql`
  query {
    myConsultations {
      id
      symptoms
      diagnosis
      createdAt
      consultant {
        full_name
      }
    }
  }
`;

export const CONSULTANT_CONSULTATIONS = gql`
  query {
    consultationsForConsultant {
      id
      symptoms
      diagnosis
      createdAt
      patient {
        full_name
      }
    }
  }
`;


export const ALL_CONSULTATIONS = gql`
  query AllConsultations {
    allConsultations {
      id
      symptoms
      diagnosis
      createdAt
      patient {
        full_name
      }
      consultant {
        full_name
      }
    }
  }
`;




export const MY_APPOINTMENTS = gql`
  query {
    myAppointments {
    id
    reason
    status
    appointmentDate
    patient {
      id
      full_name
    }
    consultant {
      id
      full_name
    }
  }
  }
`;

export const CONSULTANT_APPOINTMENTS = gql`
  query {
    consultantAppointments {
    id
    reason
    status
    appointmentDate
    patient {
      id
      full_name
    }
    consultant {
      id
      full_name
    }
  }
  }
`;



export const ALL_APPOINTMENTS = gql`
  query AllAppointments {
   allAppointments {
    id
    reason
    status
    appointmentDate
    patient {
      id
      full_name
    }
    consultant {
      id
      full_name
    }
  }
  }
`;
