'use server';

/**
 * @fileOverview Generates descriptive tags for 360 images using AI.
 *
 * - generateImageTags - A function that generates tags for a given image.
 * - GenerateImageTagsInput - The input type for the generateImageTags function.
 * - GenerateImageTagsOutput - The return type for the generateImageTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageTagsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A 360 photo of a property, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateImageTagsInput = z.infer<typeof GenerateImageTagsInputSchema>;

const GenerateImageTagsOutputSchema = z.object({
  tags: z.array(z.string()).describe('An array of descriptive tags for the image.'),
});
export type GenerateImageTagsOutput = z.infer<typeof GenerateImageTagsOutputSchema>;

export async function generateImageTags(input: GenerateImageTagsInput): Promise<GenerateImageTagsOutput> {
  return generateImageTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateImageTagsPrompt',
  input: {schema: GenerateImageTagsInputSchema},
  output: {schema: GenerateImageTagsOutputSchema},
  prompt: `You are an expert real estate agent. Your task is to generate descriptive and marketable tags for a 360° property image.

Focus on features that buyers look for. Identify the room type (e.g., "Kitchen", "Master Bedroom", "Garden").
Note key features (e.g., "Hardwood Floors", "Natural Light", "Open-Plan", "Fireplace", "Breakfast Bar", "City View").
Mention style or condition (e.g., "Modern", "Newly-Renovated", "Cosy", "Spacious").

Generate a concise list of 3-5 high-impact tags.

Return only the tags themselves, as a JSON array of strings.

Image: {{media url=photoDataUri}}`,
});

const generateImageTagsFlow = ai.defineFlow(
  {
    name: 'generateImageTagsFlow',
    inputSchema: GenerateImageTagsInputSchema,
    outputSchema: GenerateImageTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
