export default function useThrower(message: string, condition = true) {
    if (condition) throw new Error(message);
}
