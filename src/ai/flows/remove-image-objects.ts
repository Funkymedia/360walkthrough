'use server';
/**
 * @fileOverview An AI flow for removing objects from property images.
 *
 * - removeImageObjects - A function that removes objects from an image based on a text prompt.
 * - RemoveImageObjectsInput - The input type for the removeImageObjects function.
 * - RemoveImageObjectsOutput - The return type for the removeImageObjects function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RemoveImageObjectsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a property, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  instructions: z.string().describe('Instructions on what objects to remove from the image.'),
});
export type RemoveImageObjectsInput = z.infer<typeof RemoveImageObjectsInputSchema>;

const RemoveImageObjectsOutputSchema = z.object({
  editedPhotoDataUri: z.string().describe('The edited photo as a data URI.'),
});
export type RemoveImageObjectsOutput = z.infer<typeof RemoveImageObjectsOutputSchema>;

export async function removeImageObjects(input: RemoveImageObjectsInput): Promise<RemoveImageObjectsOutput> {
  return removeImageObjectsFlow(input);
}

const removeImageObjectsFlow = ai.defineFlow(
  {
    name: 'removeImageObjectsFlow',
    inputSchema: RemoveImageObjectsInputSchema,
    outputSchema: RemoveImageObjectsOutputSchema,
  },
  async ({ photoDataUri, instructions }) => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: [
        {text: `You are an expert real estate photo editor. Your task is to perform inpainting to remove objects from an image based on the user's instructions.
        
Instructions: ${instructions}

Return only the edited image.`},
        {media: {url: photoDataUri}},
    ],
      config: {
        responseModalities: ['IMAGE', 'TEXT'],
      },
    });

    if (!media?.url) {
        throw new Error('Image generation failed to produce an output.');
    }

    return { editedPhotoDataUri: media.url };
  }
);
