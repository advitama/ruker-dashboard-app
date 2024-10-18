"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// import hooks
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Import React query hooks
import { useQuery, useMutation } from "@tanstack/react-query";

// Import Dashboard API
import DASHBOARD_API from "@/lib/api/dashboard";

// Import icon
import { LoaderCircle } from "lucide-react";

import { AxiosError } from "axios";

const FormSchema = z.object({
  name: z.string(),
  industry: z.string(),
  size: z.string(),
});

export function WorkspaceOnboarding() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { toast } = useToast();

  const { mutateAsync } = useMutation({
    mutationFn: async (data: z.infer<typeof FormSchema>) => {
      try {
        await DASHBOARD_API.post("/company", {
          ...data,
          industry_id: parseInt(data.industry),
        });
      } catch (error) {
        throw new Error((error as AxiosError).message);
      }
    },
    onSuccess: () => {
      toast({
        title: "Workspace Created Successfully",
        description: "Your workspace has been created and saved successfully.",
      });
      window.location.reload();
    },
    onError: (error) => {
      toast({
        title: "Creation Failed",
        description:
          (error as AxiosError)?.message ||
          "There was an error creating your workspace. Please try again.",
      });
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await mutateAsync(data);
  }

  const { data, isFetched } = useQuery({
    queryKey: ["industries"],
    queryFn: async () => {
      const response = await DASHBOARD_API.get("/company/industry");
      return response.data;
    },
  });

  const sizes = ["Just yourself", "2-10", "11-50", "51-200", "201-500", "500+"];

  return (
    <Card className="w-full mt-4">
      <CardHeader>
        <CardTitle>Create Your Workspace</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your workspace name" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          {isFetched ? (
                            <SelectValue placeholder="Select an industry" />
                          ) : (
                            <div className="flex justify-start gap-2">
                              <LoaderCircle className="h-4 w-4 animate-spin" />
                              Loading industries
                            </div>
                          )}
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data?.map((industry: { id: number; name: string }) => (
                          <SelectItem
                            key={industry.id}
                            value={industry.id.toString()}
                          >
                            {industry.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company size</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select organization size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sizes?.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
