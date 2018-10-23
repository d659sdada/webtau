/*
 * Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.twosigma.webtau.report;

import com.twosigma.webtau.reporter.TestStatus;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.function.Consumer;
import java.util.stream.Stream;

public class ReportTestEntries {
    private List<ReportTestEntry> entries;

    public ReportTestEntries() {
        entries = Collections.synchronizedList(new ArrayList<>());
    }

    public ReportTestEntries(List<ReportTestEntry> entries) {
        this.entries = Collections.synchronizedList(entries);
    }

    public void add(ReportTestEntry entry) {
        entries.add(entry);
    }

    public void forEach(Consumer<ReportTestEntry> action) {
        entries.forEach(action);
    }

    public Stream<ReportTestEntry> stream() {
        return entries.stream();
    }

    public int size() {
        return entries.size();
    }

    public boolean isEmpty() {
        return entries.isEmpty();
    }

    public Stream<ReportTestEntry> withStatus(TestStatus status) {
        return entries.stream().filter(e -> e.getTestStatus() == status);
    }

    public long countWithStatus(TestStatus status) {
        return withStatus(status).count();
    }
}