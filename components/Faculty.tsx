// Dict of programs to colours
type FacultyColours = {
    [program: string]: string;
}

const programColours: FacultyColours  = {
    "Mathematics": "bg-[#C60078]",
    "Engineering": "bg-[#57058B]",
    "Health": "bg-[#00a0ae]",
    "Science": "bg-[#0033BE]",
    "Environment": "bg-[#607000]",
    "Arts": "bg-[#D93F00]",
};

export default function Faculty({ program }: { program: string }) {
    return <div className={`rounded-2xl py-0.5 px-2.5 text-white font-bold text-sm ${programColours[program]}`}>{program}</div>;
}
