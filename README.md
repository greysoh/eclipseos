# EclipseOS
Operating system written in JavaScript
## Running
Install `qbuild` [here](https://github.com/greysoh/qbuild).  
  
Git clone this repo:
```
git clone https://github.com/greysoh/jskernel.git
```
Go into the folder, and the buildagent folder, and install all packages.
```
cd jskernel/buildagent
npm install
```
Go out of the directory, and build the contents using npm run build. Then, start the web server using npm start.
```
npm run build
npm start
```
## Architecture
[Asciiflow link](https://asciiflow.com/#/share/eJztnOFq2zAQx19F%2BHNIR2GF5cvYVspKtxUaNhgEhpqoqakjBUthDaXf9gije5exp%2BmTzGlaN3Hk5GRLieTeH32wL%2Fbd72TpLDUlNxGnIxZ1%2BCRJWlFCpyyNOtFNL7ruRZ03rw9avWiaHe0f7GdHil2r7KQXkRLd%2F%2F7nZ%2Bv1%2BBrmso9K5Y%2FHw9PPlj2Wa6NHP1vGvAa7WrJ414ar7c7RlQB3K6M3MwEdrKcAZgCPtXK4OPV25emEpZwlS55Ou2eMDli6K6atPZOS%2BHj3Vu62Us%2BNQ1qkt%2B3qmMfqh1R0yF5VcaWdKvXo5m5sO9taq4CnO9Pk7zR32IVQb7Uf%2BBPRsmXlGs%2FjfKTysk8VWe5c8lWyVJJFKxkyfpW%2FFB1mRdtXbUok6wfQe1uKE8TsAF3ni18fWo11hS6lOj3ScO9d1p%2BcVKtdAO%2FLp%2Bg9d7eDeZDHRqf%2BOvWndJa8YUKNEGc7JbcRCmaMsOTKk1G9xPSynPq9WisOwpVBWTsOMBngZsHJbkHHXDy7L26kau6kXnrMb0fdQoTuVC5ajmW241ZkMn4bdJ7bjhncXANlhSHWe67Q3MFoTBjMLNCmmQl76G7YisfFquYq6ncmOytRv4iOy6hnE%2F6whWkvRH0vhJIqpePG9fAuono70h9Da0xZsGolF5SuUf%2BYuStLCNANNdu8y4x7GnZhjbRKzFZx7%2F%2F88mI0bG53fyFd0lU0VUResiQh41T0mcy%2FljPPlHwSdEDo3NUwpSMJeXIQzdyMrgZxSvYuxYi1CFP9tv2nawtVbw4O1UXTBLPprmI31GyutxsVhFRweUoF%2FodK92rQFFlb9LYNoxci2lDGciFSEmd7PpKysZB7I5odeoZYYkZEuMJAbEr9zIVQUCEUVD6teepOWq8S0VsR0UDBIB6KnzyZ%2FSUmzq2%2BIWqsiGigMBCbUT1zIRVcSAWXp1Q%2BLcVqVRO%2F0tAaEdFEoSAec6lm34bFz0bfEDVGRDRRGIhNqJ1PQiq4kAouXPA4UBjlUWtERBM9IH5IGVWM9AW%2FiIfSS0SNERFNhIg21JDynguxTIRYJsKFmQOFUSO1RkQ00SPiu8GATGa%2FutR5NPqFmAqhWoSLczGYtgjlgnuHqDUiookQ0YYa8gbKhVgmQiwTIZaJcKXtQGG8UbRGRDTRE%2BIZO89Ws89GDxGLRkQ0ESLaUK3yHt1Gt%2F8BwUJ1uA%3D%3D)
```
                        ┌─────────────────────────────────────────────────┐
                        │                                                 │
                        │                                                 │
                        │                       DOM                       │
                        │                                                 │
                        └─────────────────────────────────────────────────┘

                                                │
                                                │
                                                │
                                                │
                                                │
                                                │
                                        ┌───────┴────────┐
                                        ▼                ▼
                                    ┌────────┐      ┌─────────┐
                                    │        │      │         │
                                    │        │      │         │
                                    │ Kernel │      │OSReader │
                                    │        │      │         │
                                    └────────┘      └───┬─────┘
                                                        │
                                                        │
                                                        │
                                                        │
                                                        │
                                                        │
                                              ┌─────────┴──────────┐
                                              │                    │
                                              │                    │
                                              │     Init_stage0    │
                                          ┌───┤                    │
                                          │   │                    │
                                          │   └───────┬─────────┬──┴─────────────┐
                                          │           │         │                │
                                          │   ┌───────┴───┐  ┌──┴───────┐ ┌──────┴────┐
                                          │   │           │  │          │ │           │
                                          │   │           │  │          │ │           │
                                          │   │ Hashcat   ├──┤ Users    ├─┤ genkernel │
                                          │   │           │  │          │ │ a.k.a sec │
                                          │   │           │  │          │ │           │
                                          │   │           │  │          │ │           │
                                          │   └───────────┘  └──────────┘ └─────┬─────┘
                                          │                                     │
                                          │                                     │
                                          └──────────────────────────────┬──────┴─────┐
                                                                         │            │
                                                                         │            │
                                                                         │            │
                                                                         │ SecuKernel │
                                                                         │            │
                                                                         │            │
                                                                         │            │
                                                                         └─────┬──────┘
                                                                               │
                                                                               │
                                                                               │
                                                                               │
                                                                               │
                                                                     ┌─────────┴──────────┐
                                                                     │                    │
                                                                     │                    │
                                                                     │        init        │
                                                                     │                    │
                                                                     │                    │
                                                                     │                    │
                                                                     └─────────┬──────────┘
                                                                               │
                                                                               │
                                                                               │
                                                                 ┌─────────────┼──────────────┐
                                                                 │             │              │
                                                           ┌─────┴─────┐  ┌────┴─────┐  ┌─────┴─────┐
                                                           │           │  │          │  │           │
                                                           │           │  │          │  │           │
                                                           │           │  │          │  │           │
                                                           │    VFS    │  │   Sys    │  │Is set up? │
                                                           │           │  │          │  │           │
                                                           │           │  │          │  │           │
                                                           └───────────┘  └──────────┘  └────┬──────┘
                                                                                             │
                                                                                             │
                                                                                             │
                                                                                    ┌────────┴───────┐
                                                                                    │                │
                                                                                    │                │
                                                                                    │                │
                                                                                ┌───┴─────┐    ┌─────┴────┐
                                                                                │         │    │          │
                                                                                │  Yes:   │    │    No:   │
                                                                                │Run init.│    │ Bootstrap│
                                                                                │         │    │          │
                                                                                │         │    │          │
                                                                                └───┬─────┘    └─────┬────┘
                                                                                    │                │
┌───────────────────────────┐                ┌───────────────────┐                  │                │                                ┌────────────────────┐
│                           │                │                   │                  │                │                                │                    │
│                           │                │                   │◄─────────────────┘                └───────────────────────────────►│                    │
│    Start shell process    │◄───────────────┤ Load all programs │                                                                    │ mkdir /home, etc.  │
│                           │                │                   │                                                                    │                    │
│                           │                │                   │                                                                    │                    │
└───────────────────────────┘                └───────────────────┘                                                                    └─────────┬──────────┘
                                                                                                                                                │
                                                                                                                                                │
                                                                                                                                                │
                                                                                                                                                ▼
                                                                                                                                      ┌────────────────────┐
                                                                                                                                      │                    │
                                                                                                                                      │                    │
                                                                                                                                      │                    │
                                                                                                                                      │for i in repos/main │
                                                                                                                                      │                    │
                                                                                                                                      │                    │
                                                                                                                                      │                    │
                                                                                                                                      └────────┬───────────┘
                                                                                                                                               │
                                                                                                                                               │
                                                                                                                                               │
                                                                                                                                               │
                                                                                                                                               ▼
                                                                                                                                       ┌───────────────────┐
                                                                                                                                       │                   │
                                                                                                                                       │                   │
                                                                                                                                       │                   │
                                                                                                                                       │   Download i      │
                                                                                                                                       │                   │
                                                                                                                                       │                   │
                                                                                                                                       │                   │
                                                                                                                                       └────────┬──────────┘
                                                                                                                                                │
                                                                                                                                                │
                                                                                                                                                │
                                                                                                                                                │
                                                                                                                                                │
                                                                                                                                                ▼
                                                                                                                                        ┌──────────────────┐
                                                                                                                                        │                  │
                                                                                                                                        │                  │
                                                                                                                                        │                  │
                                                                                                                                        │  Install i       │
                                                                                                                                        │                  │
                                                                                                                                        │                  │
                                                                                                                                        │                  │
                                                                                                                                        └───────┬──────────┘
                                                                                                                                                │
                                                                                                                                                │
                                                                                                                                                │
                                                                                                                                                │
                                                                                                                                                ▼
                                                                                                                                        ┌──────────────────┐
                                                                                                                                        │                  │
                                                                                                                                        │                  │
                                                                                                                                        │                  │
                                                                                                                                        │  Create configs  │
                                                                                                                                        │                  │
                                                                                                                                        │                  │
                                                                                                                                        │                  │
                                                                                                                                        │                  │
                                                                                                                                        └────────┬─────────┘
                                                                                                                                                 │
                                                                                                                                                 │
                                                                                                                                                 │
                                                                                                                                                 │
                                                                                                                                                 ▼
                                                                                                                                        ┌──────────────────┐
                                                                                                                                        │                  │
                                                                                                                                        │                  │
                                                                                                                                        │                  │
                                                                                                                                        │    Add users:    │
                                                                                                                                        │root, nobody, anon│
                                                                                                                                        │                  │
                                                                                                                                        │                  │
                                                                                                                                        │                  │
                                                                                                                                        │                  │
                                                                                                                                        └────────┬─────────┘
                                                                                                                                                 │
                                                                                                                                                 │
                                                                                                                                                 │
                                                                                                                                                 │
                                                                                                                                                 │
                                                                                                                                                 │
                                                                                                                                                 ▼
                                                                                                                                        ┌──────────────────┐
                                                                                                                                        │                  │
                                                                                                                                        │                  │
                                                                                                                                        │                  │
                                                                                                                                        │     Reboot       │
                                                                                                                                        │                  │
                                                                                                                                        │                  │
                                                                                                                                        │                  │
                                                                                                                                        │                  │
                                                                                                                                        └──────────────────┘
```
