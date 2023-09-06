-- AlterTable
ALTER TABLE "Film" ADD COLUMN "backdrop" TEXT DEFAULT 'https://placehold.co/1920x1080?text=Image';
ALTER TABLE "Film" ADD COLUMN "poster" TEXT DEFAULT 'https://placehold.co/300x450?text=Image';
ALTER TABLE "Film" ADD COLUMN "trailer" TEXT DEFAULT 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

-- AlterTable
ALTER TABLE "Person" ADD COLUMN "image" TEXT DEFAULT 'https://placehold.co/300x450?text=Image';
