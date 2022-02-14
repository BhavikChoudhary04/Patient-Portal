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
        accessToken:string,
        user: {
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
}

export interface UserDemographic {
        id?: number,
        userId: number,
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

export interface UserMedicationsAllergies {
        id?: number,
        userId: number,
        currentMedication: string,
        otc: string,
        antibiotics: string,
        socialDrugs: string,
        pastMedication: string,
        drugAllergies: string,
        otherAllergies?: string 
}
