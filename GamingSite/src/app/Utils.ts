export abstract class Utils{
    public static getElapsedTime(gameStartDate: Date): string {
        const now = new Date();
        const elapsedMS = now.getTime() - gameStartDate.getTime();
        const elapsedSeconds = Math.floor(elapsedMS / 1000);
        const minutes = Math.floor(elapsedSeconds / 60);
        const seconds = elapsedSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }

    public static getTimeFromDate(date: Date){
        return Date.now() - date.getTime();
    }
}
