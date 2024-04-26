<?php

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserProfile;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Usuários padrões do sistema
        //Pode logar com o e-mail ou matricula
        factory(User::class)->create([
            'name' => 'Administrador',
            'email' => 'admin@user.com',
            'enrolment' => 100001,
            'password' => bcrypt('s3cr3t')
        ])->each(function (User $user){
            $profile = factory(UserProfile::class)->make();
            $user->profile()->create($profile->toArray());
            User::assingRole($user, User::ROLE_ADMIN);
            $user->save();
        });

        // Criando Professor
        factory(User::class,10)->create()->each(function(User $user){
            if(!$user->userable) {
                $profile = factory(UserProfile::class)->make();
                $user->profile()->create($profile->toArray());
                User::assingRole($user, User::ROLE_TEACHER);
                User::assignEnrolment(new User(), User::ROLE_TEACHER);
                $user->save();
            }
        });

        // Criando Aluno
        factory(User::class,10)->create()->each(function(User $user){
            if(!$user->userable) {
                $profile = factory(UserProfile::class)->make();
                $user->profile()->create($profile->toArray());
                User::assingRole($user, User::ROLE_STUDENT);
                User::assignEnrolment(new User(), User::ROLE_STUDENT);
                $user->save();
            }
        });

    }
}
