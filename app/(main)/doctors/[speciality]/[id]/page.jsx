import { getAvailableTimeSlots, getDoctorById } from '@/actions/appointments';
import { redirect } from 'next/navigation';
import React from 'react'
import DoctorProfile from './_components/doctorProfile';

const DoctorProfilePage = async ({params}) => {
    const { id } = await params;
    try {
        const [doctorData, slotsData] = await Promise.all([
            getDoctorById(id),
            getAvailableTimeSlots(id)
        ]);

        return <DoctorProfile doctorData={doctorData} slotsData={slotsData} />;
    } catch (error) {
        console.error("Error fetching doctor profile or time slots:", error);
        redirect('/doctors');
    }
}

export default DoctorProfilePage;