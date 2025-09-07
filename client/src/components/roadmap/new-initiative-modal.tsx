import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { type Team, type Priority, type Quarter, teams, priorities, quarters, insertInitiativeSchema } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface NewInitiativeModalProps {
  isOpen: boolean;
  onClose: () => void;
  roadmapId: string;
  onSuccess: () => void;
}

const formSchema = insertInitiativeSchema.extend({
  title: z.string().min(1, "Título é obrigatório"),
  team: z.enum(teams),
  priority: z.enum(priorities),
  quarter: z.enum(quarters),
  owner: z.string().min(1, "Responsável é obrigatório"),
});

type FormData = z.infer<typeof formSchema>;

const teamLabels: Record<Team, string> = {
  engineering: "Engineering",
  design: "Design",
  product: "Product",
  marketing: "Marketing", 
  data: "Data",
};

const priorityLabels: Record<Priority, string> = {
  alta: "Alta",
  media: "Média",
  baixa: "Baixa", 
};

const quarterLabels: Record<Quarter, string> = {
  Q1: "Q1 2024",
  Q2: "Q2 2024",
  Q3: "Q3 2024",
  Q4: "Q4 2024",
};

export default function NewInitiativeModal({ 
  isOpen, 
  onClose, 
  roadmapId, 
  onSuccess 
}: NewInitiativeModalProps) {
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roadmapId,
      title: "",
      description: "",
      team: "engineering",
      priority: "media",
      quarter: "Q1",
      owner: "",
      progress: 0,
    },
  });

  const createInitiativeMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return apiRequest("POST", "/api/initiatives", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/roadmaps", roadmapId, "initiatives"] });
      toast({
        title: "Sucesso",
        description: "Iniciativa criada com sucesso!",
      });
      form.reset();
      onSuccess();
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao criar iniciativa. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    createInitiativeMutation.mutate(data);
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Nova Iniciativa</DialogTitle>
            <Button variant="ghost" size="sm" onClick={handleClose} data-testid="button-close-modal">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Digite o título da iniciativa" 
                      {...field} 
                      data-testid="input-title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva a iniciativa" 
                      rows={3} 
                      {...field} 
                      data-testid="textarea-description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="team"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Equipe</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-team">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {teams.map((team) => (
                          <SelectItem key={team} value={team}>
                            {teamLabels[team]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prioridade</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-priority">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {priorities.map((priority) => (
                          <SelectItem key={priority} value={priority}>
                            {priorityLabels[priority]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="quarter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trimestre</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-quarter">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {quarters.map((quarter) => (
                        <SelectItem key={quarter} value={quarter}>
                          {quarterLabels[quarter]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="owner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsável</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Nome do responsável" 
                      {...field} 
                      data-testid="input-owner"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={handleClose}
                data-testid="button-cancel"
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={createInitiativeMutation.isPending}
                data-testid="button-submit"
              >
                {createInitiativeMutation.isPending ? "Criando..." : "Criar Iniciativa"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
