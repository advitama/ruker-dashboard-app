"use client"; // Make sure this is at the top

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

const FormSchema = z.object({
  name: z.string(),
  industry: z.string(),
});

export function AddCompanyForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { toast } = useToast();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof FormSchema>) => {
      try {
        const response = await DASHBOARD_API.post("/company", {
          ...data,
          industry_id: parseInt(data.industry),
        });
      } catch (error) {
        throw new Error((error as any).response?.data?.message);
      }
    },
    onSuccess: () => {
      toast({
        title: "Successfull",
        description: "OK"
      })
    },
    onError: () => {
       toast({
         title: "Failed",
         description: "OK",
       });
    }
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    await mutateAsync(data);
  }

  const { data, isFetched } = useQuery({
    queryKey: ["industries"],
    queryFn: async () => {
      const response = await DASHBOARD_API.get("/company/industry");
      return response.data;
    },
  });

  return (
    <Card className="w-full mt-4">
      <CardHeader>
        <CardTitle>Create a New Company</CardTitle>
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
                    <FormLabel>Company name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your company name" {...field} />
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
                          <SelectValue placeholder="Select an industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data?.map((industry: any) => (
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
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit">Add Company</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => (window.location.href = "/")}
            >
              Back to Dashboard
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
