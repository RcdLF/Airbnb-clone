import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservation";
import TripsClient from "./TripsClient";

const TripsPage =async () => {
    
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please Login"
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservation({
        userId : currentUser.id
    });

    if(reservations.length === 0){
        return (
            <ClientOnly >
                <EmptyState 
                 title=" Not trips found"
                 subtitle="Looks like you havent reserved any trips"
                /> 
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <TripsClient 
             reservations={reservations}
             currentUser={currentUser}
            />
        </ClientOnly>
    )

}

export default TripsPage