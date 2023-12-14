export interface Theme {
    assignment: string,
    title: string,
    border: string,
    background: string,
}

export interface Information{
    title: string,
    teacher: string,
    classCode: number,
}

export interface Assignment{
    today: String[],
    otherDay: String[],
}