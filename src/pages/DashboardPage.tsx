import {
    BookOpen,
    Brain,
    Clock3,
    Target,
    Trophy,
} from 'lucide-react'

import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

function DashboardPage() {
    return (
        <main className="min-h-screen text-white">
            {/* Content */}
            <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

                {/* Welcome */}
                <section className="mb-10">
                    <h2 className="text-3xl font-black">
                        Mulai perjalanan belajarmu 🚀
                    </h2>

                    <p className="mt-3 text-neutral-400">
                        Belajar lebih terarah. Latihan lebih cerdas.
                        Lulus lebih siap.
                    </p>
                </section>

                {/* Statistics */}
                <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    <Card
                        variant="outlined"
                        className="p-6"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-neutral-400">
                                Soal Dikerjakan
                            </p>

                            <BookOpen className="h-5 w-5 text-yellow-400" />
                        </div>

                        <p className="mt-4 text-3xl font-black">
                            0
                        </p>

                        <p className="mt-2 text-xs text-neutral-500">
                            Mulai latihan pertamamu
                        </p>
                    </Card>

                    <Card
                        variant="outlined"
                        className="p-6"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-neutral-400">
                                Akurasi
                            </p>

                            <Target className="h-5 w-5 text-yellow-400" />
                        </div>

                        <p className="mt-4 text-3xl font-black">
                            0%
                        </p>

                        <p className="mt-2 text-xs text-neutral-500">
                            Belum ada data
                        </p>
                    </Card>

                    <Card
                        variant="outlined"
                        className="p-6"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-neutral-400">
                                Waktu Belajar
                            </p>

                            <Clock3 className="h-5 w-5 text-yellow-400" />
                        </div>

                        <p className="mt-4 text-3xl font-black">
                            0 jam
                        </p>

                        <p className="mt-2 text-xs text-neutral-500">
                            Belum mulai belajar
                        </p>
                    </Card>

                    <Card
                        variant="outlined"
                        className="p-6"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-neutral-400">
                                Simulasi
                            </p>

                            <Trophy className="h-5 w-5 text-yellow-400" />
                        </div>

                        <p className="mt-4 text-3xl font-black">
                            0
                        </p>

                        <p className="mt-2 text-xs text-neutral-500">
                            Belum ada simulasi
                        </p>
                    </Card>

                </section>

                {/* Main Cards */}
                <section className="mt-10 grid gap-6 lg:grid-cols-3">

                    <Card
                        variant="outlined"
                        className="p-8 lg:col-span-2"
                    >
                        <div className="flex items-start gap-5">

                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-400">
                                <BookOpen className="h-7 w-7" />
                            </div>

                            <div>
                                <h3 className="text-xl font-bold">
                                    Mulai Belajar
                                </h3>

                                <p className="mt-2 leading-7 text-neutral-400">
                                    Pelajari materi CPNS secara terstruktur dan
                                    tingkatkan pemahamanmu sedikit demi sedikit.
                                </p>

                                <Button
                                    type="button"
                                    className="mt-6"
                                >
                                    Mulai Belajar
                                </Button>
                            </div>

                        </div>
                    </Card>

                    <Card
                        variant="outlined"
                        className="p-8"
                    >
                        <div className="flex items-start gap-5">

                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-400">
                                <Brain className="h-7 w-7" />
                            </div>

                            <div>
                                <h3 className="text-xl font-bold">
                                    Latihan Soal
                                </h3>

                                <p className="mt-2 leading-7 text-neutral-400">
                                    Uji kemampuanmu dengan latihan soal CPNS.
                                </p>

                                <Button
                                    type="button"
                                    variant="outline"
                                    className="mt-6"
                                >
                                    Latihan Sekarang
                                </Button>
                            </div>

                        </div>
                    </Card>

                </section>

            </div>
        </main>
    )
}

export default DashboardPage