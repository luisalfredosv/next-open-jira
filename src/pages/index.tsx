import { Layout } from "@/components/layouts/Layout";
import { EntryList } from "@/components/ui/EntryList";
import { NewEntry } from "@/components/ui/NewEntry";
import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";

export default function Home() {
	return (
		<>
			<Layout title='Home - NextOpen Jira'>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={4}>
						<Card sx={{ height: "calc(100vh - 100px)" }}>
							<CardHeader title={"Pendientes"}></CardHeader>

							<CardContent>
								<NewEntry />
								<EntryList status='pending' />
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Card sx={{ height: "calc(100vh - 100px)" }}>
							<CardHeader title={"En progreso"}></CardHeader>

							<CardContent>
								<EntryList status='inProgress' />
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Card sx={{ height: "calc(100vh - 100px)" }}>
							<CardHeader title={"Completadas"}></CardHeader>

							<CardContent>
								<EntryList status='finished' />
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Layout>
		</>
	);
}
