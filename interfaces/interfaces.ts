export interface Theme {
    assignment: string,
    title: string,
    border: string,
    background: string,
}

export interface Information{
    title: string,
    teacher: string,
}

export interface Assignment{
    today: Object,
    otherDay: String[],
}