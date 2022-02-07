export interface Report {
    id?: number,
    userid: number,
    vitals: {
        bloodPressure: string,
        pulse: string,
        temperature: string,
        respiration: string,
        height: string,
        weight: string
    },
    procedureCode: string,
    diagnosisCode: string,
    labReport: string,
    radiologyReport: string,
    medication: Array<string>
}