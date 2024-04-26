<?php

use Illuminate\Database\Seeder;

class ClassInformationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $students = \App\Models\Student::all();
        factory(App\Models\ClassInformation::class,50)
            ->create()
            ->each(function (\App\Models\ClassInformation $model) use($students){
                /** @var \Illuminate\Support\Collection $studentsCol */
                $studentsCol = $students->random(10);
                $model->students()->attach($studentsCol->pluck('id'));
            });
    }
}
