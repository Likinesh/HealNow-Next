"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { getDoctorAppointments } from "@/actions/doctors";
import { AppointmentCard } from "@/components/appointmentCard";

export default function DoctorAppointmentsList() {
  const {
    loading,
    data,
    fn: fetchAppointments,
  } = useFetch(getDoctorAppointments);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const appointments = data?.appointments || [];

  const scheduled = appointments.filter((a) => a.status === "SCHEDULED");
  const completed = appointments.filter((a) => a.status === "COMPLETED");
  const cancelled = appointments.filter((a) => a.status === "CANCELLED");

  const renderAppointmentList = (list, emptyMessage) => {
    if (list.length === 0) {
      return (
        <div className="text-center py-8">
          <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      );
    }
    return (
      <div className="space-y-4">
        {list.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            userRole="DOCTOR"
            refetchAppointments={fetchAppointments}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="border-emerald-900/20">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-emerald-400" />
          Your Appointments
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading appointments...</p>
          </div>
        ) : (
          <Tabs defaultValue="scheduled" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-6 bg-muted/30">
              <TabsTrigger value="scheduled">
                Scheduled ({scheduled.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({completed.length})
              </TabsTrigger>
              <TabsTrigger value="cancelled">
                Cancelled ({cancelled.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="scheduled" className="mt-0 border-none p-0">
              {renderAppointmentList(
                scheduled,
                "You don't have any scheduled appointments yet. Make sure you've set your availability to allow patients to book."
              )}
            </TabsContent>
            <TabsContent value="completed" className="mt-0 border-none p-0">
              {renderAppointmentList(
                completed,
                "You don't have any completed appointments."
              )}
            </TabsContent>
            <TabsContent value="cancelled" className="mt-0 border-none p-0">
              {renderAppointmentList(
                cancelled,
                "You don't have any cancelled appointments."
              )}
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}