export interface RegisterUser {
        id?: number,
        firstName: string,
        lastName: string,
        userName: string,
        email: string,
        role: string,
        dob: string,
        mobile: string,
        password: string,
        isAuthenticated: boolean
}

export interface LoginUser {
        email: string,
        password: string
}

export interface UserDemographic {
        id?: number,
        userid: number,
        firstName: string,
        lastName: string,
        dob: string,
        mobile: string,
        gender? : string,
        ethnicity? :  string,
        education? : string,
        occupation? : string,
        address? : string,
        medicalHistory? : string,
        familymedicalhistory? : string,
        surgeries?  : string,
        insuranceProvider?  : string 
}

export interface UserMedicationsAllergies{
        id?: number,
        userid: number,
        current_medication: string,
        otc: string,
        antibiotics: string,
        social_drugs: string,
        past_medication: string,
        drug_allergies: string,
        other_allergies?: string 
}
